import { test, expect } from '@playwright/test'

const chartIsRendered = () => {
  const canvas = document.querySelector('#myChart') as HTMLCanvasElement
  // Wait for canvas to have actual dimensions (indicating it's been drawn)
  return canvas && canvas.width > 0 && canvas.height > 0
}

test.describe('Poster Screenshot Tests', () => {
  test('should match snapshot', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForFunction(chartIsRendered)

    // Take a screenshot and compare to snapshot
    await expect(page).toHaveScreenshot('poster-page.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })

  test('should match print media snapshot', async ({ page }) => {
    // Load page and render canvas first
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForFunction(chartIsRendered)

    // Now emulate print media after canvas is rendered
    await page.emulateMedia({ media: 'print' })

    // Take screenshot with print styles applied
    await expect(page).toHaveScreenshot('poster-print.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })
})
