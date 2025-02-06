-- CreateTable
CREATE TABLE "CartItem" (
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_productId_userId_key" ON "CartItem"("productId", "userId");
