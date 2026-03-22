import { TaskStatus, Priority } from "@/app/generated/prisma/client";
import { prisma } from "@/lib/prisma"

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.task.deleteMany();
  await prisma.client.deleteMany();

  const clients = await Promise.all([
    prisma.client.create({
      data: {
        companyName: "Acme Corporation",
        country: "United States",
        entityType: "LLC",
      },
    }),
    prisma.client.create({
      data: {
        companyName: "TechVentures GmbH",
        country: "Germany",
        entityType: "GmbH",
      },
    }),
    prisma.client.create({
      data: {
        companyName: "Sunrise Holdings",
        country: "Singapore",
        entityType: "Pte Ltd",
      },
    }),
    prisma.client.create({
      data: {
        companyName: "Nordic Finance AB",
        country: "Sweden",
        entityType: "AB",
      },
    }),
    prisma.client.create({
      data: {
        companyName: "Atlas Consulting Ltd",
        country: "United Kingdom",
        entityType: "Ltd",
      },
    }),
  ]);

  const now = new Date();
  const past = (days: number) =>
    new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  const future = (days: number) =>
    new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

  const taskData = [
    // Acme Corporation
    {
      clientId: clients[0].id,
      title: "Annual Tax Filing",
      description: "Submit annual corporate tax return to IRS",
      category: "Tax",
      dueDate: past(5),
      status: TaskStatus.PENDING,
      priority: Priority.HIGH,
    },
    {
      clientId: clients[0].id,
      title: "Q4 Financial Statements",
      description: "Prepare and review Q4 financial statements",
      category: "Reporting",
      dueDate: future(10),
      status: TaskStatus.IN_PROGRESS,
      priority: Priority.HIGH,
    },
    {
      clientId: clients[0].id,
      title: "AML Policy Review",
      description: "Annual review of Anti-Money Laundering policies",
      category: "AML",
      dueDate: past(15),
      status: TaskStatus.COMPLETED,
      priority: Priority.HIGH,
    },
    {
      clientId: clients[0].id,
      title: "KYC Documentation Update",
      description: "Update Know Your Customer documents for key stakeholders",
      category: "KYC",
      dueDate: future(5),
      status: TaskStatus.PENDING,
      priority: Priority.MEDIUM,
    },
    {
      clientId: clients[0].id,
      title: "Board Resolution Filing",
      description: "File board resolutions with state registry",
      category: "Corporate",
      dueDate: past(2),
      status: TaskStatus.PENDING,
      priority: Priority.HIGH,
    },
    // TechVentures GmbH
    {
      clientId: clients[1].id,
      title: "GDPR Compliance Audit",
      description: "Annual GDPR compliance audit and documentation",
      category: "Privacy",
      dueDate: past(8),
      status: TaskStatus.PENDING,
      priority: Priority.HIGH,
    },
    {
      clientId: clients[1].id,
      title: "VAT Return Q1",
      description: "Submit Q1 VAT return to Finanzamt",
      category: "Tax",
      dueDate: future(20),
      status: TaskStatus.IN_PROGRESS,
      priority: Priority.HIGH,
    },
    {
      clientId: clients[1].id,
      title: "Shareholder Register Update",
      description: "Update shareholder register with new investments",
      category: "Corporate",
      dueDate: future(30),
      status: TaskStatus.PENDING,
      priority: Priority.MEDIUM,
    },
    {
      clientId: clients[1].id,
      title: "Annual Report Publication",
      description: "Prepare and publish annual business report",
      category: "Reporting",
      dueDate: past(3),
      status: TaskStatus.COMPLETED,
      priority: Priority.MEDIUM,
    },
    // Sunrise Holdings
    {
      clientId: clients[2].id,
      title: "MAS License Renewal",
      description: "Renew MAS financial services license",
      category: "Licensing",
      dueDate: past(12),
      status: TaskStatus.PENDING,
      priority: Priority.HIGH,
    },
    {
      clientId: clients[2].id,
      title: "Transfer Pricing Documentation",
      description: "Prepare transfer pricing documentation for IRAS",
      category: "Tax",
      dueDate: future(15),
      status: TaskStatus.IN_PROGRESS,
      priority: Priority.HIGH,
    },
    {
      clientId: clients[2].id,
      title: "UBO Register Filing",
      description: "Update Ultimate Beneficial Ownership register",
      category: "KYC",
      dueDate: future(7),
      status: TaskStatus.PENDING,
      priority: Priority.HIGH,
    },
    // Nordic Finance
    {
      clientId: clients[3].id,
      title: "Bolagsverket Annual Filing",
      description: "Annual return filing with Swedish Companies Registration Office",
      category: "Corporate",
      dueDate: future(45),
      status: TaskStatus.PENDING,
      priority: Priority.MEDIUM,
    },
    {
      clientId: clients[3].id,
      title: "FATCA Reporting",
      description: "Submit FATCA report to Skatteverket",
      category: "Tax",
      dueDate: past(1),
      status: TaskStatus.PENDING,
      priority: Priority.LOW,
    },
    {
      clientId: clients[3].id,
      title: "Pension Compliance Review",
      description: "Annual review of employee pension compliance",
      category: "HR Compliance",
      dueDate: future(60),
      status: TaskStatus.PENDING,
      priority: Priority.LOW,
    },
    // Atlas Consulting
    {
      clientId: clients[4].id,
      title: "Companies House Confirmation Statement",
      description: "File annual confirmation statement with Companies House",
      category: "Corporate",
      dueDate: past(20),
      status: TaskStatus.COMPLETED,
      priority: Priority.HIGH,
    },
    {
      clientId: clients[4].id,
      title: "Corporation Tax Return",
      description: "Submit CT600 corporation tax return to HMRC",
      category: "Tax",
      dueDate: future(25),
      status: TaskStatus.IN_PROGRESS,
      priority: Priority.HIGH,
    },
    {
      clientId: clients[4].id,
      title: "PSC Register Update",
      description: "Update Persons with Significant Control register",
      category: "Corporate",
      dueDate: past(7),
      status: TaskStatus.PENDING,
      priority: Priority.HIGH,
    },
    {
      clientId: clients[4].id,
      title: "IR35 Compliance Check",
      description: "Review contractor IR35 status determinations",
      category: "HR Compliance",
      dueDate: future(14),
      status: TaskStatus.PENDING,
      priority: Priority.MEDIUM,
    },
    {
      clientId: clients[4].id,
      title: "Data Protection Impact Assessment",
      description: "Conduct DPIA for new client portal system",
      category: "Privacy",
      dueDate: future(21),
      status: TaskStatus.CANCELLED,
      priority: Priority.MEDIUM,
    },
  ];

  await prisma.task.createMany({ data: taskData });

  console.log(`✅ Seeded ${clients.length} clients and ${taskData.length} tasks`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
