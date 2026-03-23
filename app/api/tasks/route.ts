import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createTaskSchema } from "@/lib/zod";
import { TaskStatus } from "@/app/generated/prisma/client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get("clientId");
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy") || "dueDate";
    const sortOrder = (searchParams.get("sortOrder") || "asc") as "asc" | "desc";

    if (!clientId) {
      return NextResponse.json(
        { error: "clientId query param is required" },
        { status: 400 }
      );
    }

    // Verify client exists
    const client = await prisma.client.findUnique({ where: { id: clientId } });
    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    const where: Record<string, unknown> = { clientId };

    if (status && status !== "ALL") {
      where.status = status as TaskStatus;
    }
    if (category && category !== "ALL") {
      where.category = category;
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const validSortFields = ["dueDate", "priority", "createdAt", "title"];
    const orderByField = validSortFields.includes(sortBy) ? sortBy : "dueDate";

    const tasks = await prisma.task.findMany({
      where,
      orderBy: { [orderByField]: sortOrder },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("GET /api/tasks error:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = createTaskSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { clientId, title, description, category, dueDate, priority } =
      parsed.data;

    const client = await prisma.client.findUnique({ where: { id: clientId } });
    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    const task = await prisma.task.create({
      data: {
        clientId,
        title,
        description: description!,
        category,
        dueDate: new Date(dueDate),
        priority,
        status: "PENDING",
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("POST /api/tasks error:", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}
