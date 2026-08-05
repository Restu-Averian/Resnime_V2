# Resnime Chakra UI v3 Theme System

Theme ini didesain secara modular menggunakan Chakra UI v3 untuk mencapai tampilan **Deep Ocean Editorial**. Aplikasi pada fase ini adalah dark-only.

## Semantic Tokens

Selalu gunakan semantic tokens untuk UI:

- **Background:** `bg.canvas`, `bg.surface`, `bg.panel`, `bg.elevated`, `bg.interactive`
- **Text:** `fg.heading`, `fg.default`, `fg.muted`, `fg.subtle`
- **Border:** `border.subtle`, `border.default`, `border.emphasized`, `border.focus`
- **Accent (Teal):** `accent.primary`, `accent.hover`, `accent.active`
- **Status:** `status.success`, `status.warning`, `status.danger`

## Primitive Tokens

Jangan menggunakan primitive tokens langsung pada komponen (seperti `ocean.900` atau `teal.500`), kecuali jika mendefinisikan semantic token baru.
Warna hardcoded hanya diperbolehkan di dalam `tokens/colors.js`.

## Penggunaan Komponen

Semua komponen utama telah di-override menggunakan recipe:

```jsx
// Button akan otomatis memiliki warna primary Muted Teal dan teks Warm Ivory
<Button>View Details</Button>

// Card akan memiliki background dark navy dan border tipis
<Card.Root>
  <Card.Body>Content</Card.Body>
</Card.Root>
```

## Layer Styles

Untuk area kustom, gunakan layer styles:

```jsx
<Box layerStyle="panelElevated">
  Content
</Box>
```

## Menambahkan Recipe Baru

Untuk membuat atau mengedit recipe:
1. Buat file recipe di folder `recipes/` (misalnya `recipes/menu.recipe.js`).
2. Gunakan `defineRecipe` untuk komponen dasar, dan `defineSlotRecipe` untuk komponen dengan banyak slot (parts).
3. Daftarkan recipe tersebut di `index.js`.
