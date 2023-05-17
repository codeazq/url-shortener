-- CreateTable
CREATE TABLE "short_links" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(1500) NOT NULL,
    "alias" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "short_links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "short_links_alias_key" ON "short_links"("alias");

-- CreateIndex
CREATE INDEX "short_links_alias_idx" ON "short_links"("alias");
