# 🔐 Kimlik Doğrulama Akışı

ImpactLens projesi, SOC 2 uyumlu güvenli kimlik doğrulama altyapısı sağlar. Kimlik doğrulama işlemleri için [NextAuth.js](https://next-auth.js.org/) kullanılır.

---

## 🧱 Kullanılan Teknolojiler

- **Kimlik Doğrulama:** [NextAuth.js](https://next-auth.js.org/)
- **Veritabanı:** PostgreSQL
- **ORM:** Prisma
- **Şifreleme:** `bcrypt`
- **Email / Password & GitHub Provider desteklenmektedir.**

---

## 📁 Yapı Dosyaları

- `/app/api/auth/[...nextauth]/route.ts`: NextAuth yapılandırması
- `/lib/authOptions.ts`: Kimlik doğrulama seçenekleri
- `/components/SignInForm.tsx`: Giriş formu bileşeni
- `/components/SignUpForm.tsx`: Kayıt formu bileşeni

---

## 🔄 Akış Diyagramı

```text
[ Sign In / Sign Up Form ]
           │
           ▼
 [ POST /api/auth/callback ]
           │
           ▼
 [ NextAuth.js middleware ]
           │
           ▼
[ Kullanıcı doğrulama ve JWT üretimi ]
           │
           ▼
[ Session oluşturulur → client’a gönderilir ]


🧪 Email & Password ile Oturum Açma
Kayıt
Kullanıcı /signup sayfasından kayıt formunu doldurur.

Şifre bcrypt ile hashlenir.

prisma.user.create() ile kullanıcı veritabanına eklenir.

Giriş
Kullanıcı /signin sayfasından giriş yapar.

Veritabanındaki kullanıcı email ile bulunur.

Şifre bcrypt.compare() ile doğrulanır.

JWT ile oturum açılır.

🧑‍💻 GitHub OAuth ile Oturum Açma
Kullanıcı “Sign in with GitHub” butonuna tıklar.

GitHub, kullanıcıyı yetkilendirir.

Kullanıcı bilgileri profile.email, profile.name vb. ile çekilir.

Eğer kullanıcı daha önce giriş yapmadıysa veritabanına eklenir.

JWT oluşturulur ve client’a döner.

🔐 Güvenlik Notları
Şifreler hiçbir zaman düz metin olarak saklanmaz (bcrypt ile hashlenir).

NextAuth session'ları JWT ile yönetilir.

credentials provider sadece HTTPS altında çalıştırılmalıdır.

API route’lar için kullanıcı oturum doğrulaması gereklidir (getServerSession() kullanılır).

🧭 Oturum Bilgisine Erişim
Sunucu Tarafında
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/authOptions";

const session = await getServerSession(authOptions);

İstemci Tarafında
import { useSession } from "next-auth/react";

const { data: session } = useSession();


