#!/usr/bin/env node

/**
 * Image Optimization Script for Germanefkolo Website
 *
 * This script uses Sharp to optimize the hero image for web performance.
 * It creates multiple responsive sizes and optimizes compression.
 *
 * Usage: npm run optimize-images
 */

import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync, statSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const INPUT_IMAGE = join(projectRoot, 'src/assets/images/hero_image.jpg');
const OUTPUT_DIR = join(projectRoot, 'src/assets/images/optimized');

// Responsive image configurations
const IMAGE_CONFIGS = [
  {
    name: 'hero_image_mobile',
    width: 640,
    quality: 80,
    format: 'jpeg'
  },
  {
    name: 'hero_image_mobile',
    width: 640,
    quality: 75,
    format: 'webp'
  },
  {
    name: 'hero_image_tablet',
    width: 1024,
    quality: 80,
    format: 'jpeg'
  },
  {
    name: 'hero_image_tablet',
    width: 1024,
    quality: 75,
    format: 'webp'
  },
  {
    name: 'hero_image_desktop',
    width: 1920,
    quality: 75,
    format: 'jpeg'
  },
  {
    name: 'hero_image_desktop',
    width: 1920,
    quality: 70,
    format: 'webp'
  }
];

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...\n');

  // Check if input image exists
  if (!existsSync(INPUT_IMAGE)) {
    console.error(`❌ Error: Hero image not found at ${INPUT_IMAGE}`);
    process.exit(1);
  }

  // Create output directory if it doesn't exist
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`📁 Created output directory: ${OUTPUT_DIR}\n`);
  }

  // Get original image info
  const metadata = await sharp(INPUT_IMAGE).metadata();
  const originalStats = statSync(INPUT_IMAGE);
  console.log('📊 Original image info:');
  console.log(`   - Dimensions: ${metadata.width}x${metadata.height}`);
  console.log(`   - Format: ${metadata.format}`);
  console.log(`   - Size: ${(originalStats.size / 1024 / 1024).toFixed(2)}MB\n`);

  // Process each configuration
  for (const config of IMAGE_CONFIGS) {
    const outputPath = join(OUTPUT_DIR, `${config.name}.${config.format}`);

    try {
      const pipeline = sharp(INPUT_IMAGE)
        .resize(config.width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        });

      if (config.format === 'jpeg') {
        pipeline.jpeg({
          quality: config.quality,
          progressive: true,
          mozjpeg: true
        });
      } else if (config.format === 'webp') {
        pipeline.webp({
          quality: config.quality,
          effort: 6
        });
      }

      await pipeline.toFile(outputPath);

      const outputMetadata = await sharp(outputPath).metadata();
      const outputStats = statSync(outputPath);
      const fileSizeKB = (outputStats.size / 1024).toFixed(2);

      console.log(`✅ Created: ${config.name}.${config.format}`);
      console.log(`   - Dimensions: ${outputMetadata.width}x${outputMetadata.height}`);
      console.log(`   - Size: ${fileSizeKB}KB\n`);

    } catch (error) {
      console.error(`❌ Error processing ${config.name}.${config.format}:`, error.message);
    }
  }

  console.log('✨ Image optimization complete!\n');
  console.log('📝 Next steps:');
  console.log('   1. Review the optimized images in src/assets/images/optimized/');
  console.log('   2. Update hero.component.html to use responsive images');
  console.log('   3. Consider replacing the original hero_image.jpg with the optimized desktop version');
}

// Run the optimization
optimizeImages().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
