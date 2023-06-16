-- CreateTable
CREATE TABLE "url_clicks" (
    "id" BIGSERIAL NOT NULL,
    "country_name" TEXT NOT NULL,
    "country_code" TEXT NOT NULL,
    "region_name" TEXT NOT NULL,
    "region_code" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "device" TEXT,
    "os" TEXT,
    "browser" TEXT,
    "short_link_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "url_clicks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "url_clicks" ADD CONSTRAINT "url_clicks_short_link_id_fkey" FOREIGN KEY ("short_link_id") REFERENCES "short_links"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
