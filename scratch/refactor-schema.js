const fs = require('fs');
let content = fs.readFileSync('apps/api/prisma/schema.prisma', 'utf-8');

content = content.replace('provider = "postgresql"', 'provider = "sqlite"');

// Remove enums
content = content.replace(/enum \w+ \{[\s\S]*?\}/g, '');

// Scalar lists
content = content.replace(/String\[\]/g, 'String');

// Enums to Strings
const enums = ['Role', 'ShopStatus', 'ProductStatus', 'OrderStatus', 'PaymentStatus', 'PayoutStatus', 'DocumentStatus', 'AuctionStatus'];
for (const e of enums) {
    // Replace standalone occurrences of the enum as a type
    const regex = new RegExp(`(?<=\\s)${e}(?=\\s)`, 'g');
    content = content.replace(regex, 'String');
}

// Defaults
content = content.replace(/@default\(CUSTOMER\)/g, '@default("CUSTOMER")');
content = content.replace(/@default\(PENDING\)/g, '@default("PENDING")');
content = content.replace(/@default\(DRAFT\)/g, '@default("DRAFT")');
content = content.replace(/@default\(UNPAID\)/g, '@default("UNPAID")');
content = content.replace(/@default\(ACTIVE\)/g, '@default("ACTIVE")');

// Remove @db.Text and @db.VarChar
content = content.replace(/@db\.Text/g, '');
content = content.replace(/@db\.VarChar\(\d+\)/g, '');

fs.writeFileSync('apps/api/prisma/schema.prisma', content);
console.log('Schema refactored for SQLite');
