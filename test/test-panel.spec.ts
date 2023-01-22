import { test, Page, expect } from '@playwright/test'
import { baseURL, expectValue, input, textarea } from './util'

function panel (page: Page) {
  return page.locator('.n-popover')
}

function item (page: Page, text: string) {
  return panel(page).locator(`text=${text}`)
}

test('Esc', async ({ page }) => {
  await page.goto(baseURL)

  await textarea(page).click()
  await expect(panel(page)).not.toBeVisible()
  await input(page, 'linshi')
  await expect(panel(page)).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(panel(page)).not.toBeVisible()
  await input(page, 'houxu ')
  await expectValue(page, '后续')
})

test('Enter', async ({ page }) => {
  await page.goto(baseURL)

  await textarea(page).click()
  await input(page, 'shangping')
  await page.keyboard.press('Enter')
  await expectValue(page, 'shangping')
})

test('Home/End/Backspace/Delete', async ({ page }) => {
  await page.goto(baseURL)

  await textarea(page).click()
  await input(page, 'alub')
  await page.keyboard.press('Home')
  await page.keyboard.press('Delete')
  await page.keyboard.press('End')
  await page.keyboard.press('Backspace')
  await page.keyboard.press(' ')
  await expectValue(page, '路')
})

test('Arrow Up/Down', async ({ page }) => {
  await page.goto(baseURL)

  await textarea(page).click()
  await input(page, 'shangxia')
  await page.keyboard.press('PageDown')
  await page.keyboard.press('ArrowUp')
  await page.keyboard.press(' ')
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press(' ')
  await expectValue(page, '商夏')
})

test('Arrow Left/Right', async ({ page }) => {
  await page.goto(baseURL)

  await textarea(page).click()
  await input(page, 'zuoyou')
  await page.keyboard.press('ArrowLeft')
  await page.keyboard.press(' ')
  await page.keyboard.press('ArrowRight')
  await page.keyboard.press('ArrowRight')
  await page.keyboard.press(' ')
  await page.keyboard.press(' ')
  await expectValue(page, '做有偶')
})

test('Select', async ({ page }) => {
  await page.goto(baseURL)

  await textarea(page).click()
  await input(page, 'shuzidianji2')
  await item(page, '1 点击').click()
  await expectValue(page, '数字点击')
})

test('Switch page', async ({ page }) => {
  await page.goto(baseURL)

  await textarea(page).click()
  await input(page, 'fanye')
  await expect(item(page, '1 翻页')).toBeVisible()
  await input(page, '=')
  await expect(item(page, '1 烦')).toBeVisible()
  await panel(page).getByRole('button').nth(1).click()
  await expect(item(page, '1 范')).toBeVisible()
  await page.keyboard.press('PageDown')
  await expect(item(page, '1 泛')).toBeVisible()
  await input(page, '-')
  await expect(item(page, '1 范')).toBeVisible()
  await panel(page).getByRole('button').nth(0).click()
  await expect(item(page, '1 烦')).toBeVisible()
  await page.keyboard.press('PageUp')
  await expect(item(page, '1 翻页')).toBeVisible()
})