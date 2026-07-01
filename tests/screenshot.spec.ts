import { test, expect } from '@playwright/test'

const chartIsRendered = () => {
  const canvas = document.querySelector('#myChart') as HTMLCanvasElement
  // Wait for canvas to have actual dimensions (indicating it's been drawn)
  return canvas && canvas.width > 800 && canvas.height > 600
}

test.describe('Poster Screenshot Tests', () => {
  test('should match snapshot', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForFunction(chartIsRendered)

    // Rotates chart slightly left
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press("[")
      await page.waitForTimeout(50) // 50ms pause (adjust if needed)
    }

    // Rotates chart even more left with a mouse
    await page.mouse.move(800, 400)
    await page.mouse.down()
    await page.mouse.move(750, 350)
    await page.mouse.up()
    // Moves mouse to the month
    await page.mouse.move(600, 200)

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
