-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "is2FAEnabled" BOOLEAN NOT NULL DEFAULT false,
    "twoFactorSecret" TEXT,
    "otpCode" TEXT,
    "otpExpiry" DATETIME,
    "role" TEXT NOT NULL DEFAULT 'CUSTOMER',
    "walletBalance" REAL NOT NULL DEFAULT 0.0,
    "permissions" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "id", "is2FAEnabled", "name", "otpCode", "otpExpiry", "password", "permissions", "phoneNumber", "role", "twoFactorSecret", "updatedAt", "walletBalance") SELECT "createdAt", "email", "id", "is2FAEnabled", "name", "otpCode", "otpExpiry", "password", "permissions", "phoneNumber", "role", "twoFactorSecret", "updatedAt", "walletBalance" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
