# TECHNICAL TEST

## Dokumentasi Api
Dapat diakses secara lokal di http://localhost:5000/api/v3/api-docs

## Tech Stack
- Express JS
- MySQL
- Sequelize


## Getting Started

Ikuti langkah-langkah berikut untuk menjalankan proyek ini secara lokal.

### Requirement

Pastikan berikut ini sudah terinstall:
- [Node.js](https://nodejs.org/)
- MySQL

### Instalasi

1. *Clone repository:*
   
   ```bash
   git clone https://github.com/yulinarnur/Technical-Test-Diskominfo.git
   cd Technical-Test-Diskominfo
   
2. **Set up database MySQL dan konfigurasi aplikasi:**
   - Copy file **.env.example**, kemudian paste dan rename menjadi **.env**.
   - Sesuaikan dengan data untuk konfigurasi aplikasi.
   - Di sini, saya sudah mengekspor file database yang terdapat di dalam folder **src/config**.
   - Lakukan impor database dan sesuaikan konfigurasi pada file .env.
    
## Instal Depedensi & Running Server
  Untuk install depedensi dan menjalankan server, gunakan perintah berikut:
   ```bash
     yarn install
     nodemon app
