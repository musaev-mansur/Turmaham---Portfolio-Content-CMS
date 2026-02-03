-- CreateTable
CREATE TABLE "Film" (
    "id" TEXT NOT NULL,
    "titleRus" TEXT NOT NULL,
    "titleEng" TEXT NOT NULL,
    "descriptionRus" TEXT NOT NULL,
    "descriptionEng" TEXT NOT NULL,
    "imageRus" TEXT NOT NULL,
    "imageEng" TEXT NOT NULL,
    "youtubeUrl1" TEXT NOT NULL,
    "youtubeUrl2" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Film_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "titleRus" TEXT NOT NULL,
    "titleEng" TEXT NOT NULL,
    "descriptionRus" TEXT NOT NULL,
    "descriptionEng" TEXT NOT NULL,
    "imageRus" TEXT NOT NULL,
    "imageEng" TEXT NOT NULL,
    "youtubeUrl1" TEXT NOT NULL,
    "youtubeUrl2" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Work" (
    "id" TEXT NOT NULL,
    "titleRus" TEXT NOT NULL,
    "titleEng" TEXT NOT NULL,
    "descriptionRus" TEXT NOT NULL,
    "descriptionEng" TEXT NOT NULL,
    "imageRus" TEXT NOT NULL,
    "imageEng" TEXT NOT NULL,
    "youtubeUrl1" TEXT NOT NULL,
    "youtubeUrl2" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Work_pkey" PRIMARY KEY ("id")
);
