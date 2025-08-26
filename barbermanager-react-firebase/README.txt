
# BarberManager (React + Firebase)

Gestão completa de barbearia: clientes, agenda, serviços, colaboradores, financeiro e relatórios.
Front-end em React (Vite + Tailwind) e backend serverless com Firebase (Auth, Firestore, Hosting).

## 🚀 Setup rápido
1) **Clone o projeto** e instale deps
```bash
npm i
cp .env.example .env
```
2) **Crie um projeto no Firebase** e ative:
   - Authentication (Email/Senha)
   - Firestore Database (modo production com regras seguras)
   - Hosting (opcional para PWA)
3) **Preencha o `.env`** com as credenciais do app Web do Firebase.
4) **Rodar local**
```bash
npm run dev
```

## 🔒 Regras do Firestore (exemplo de segurança multi-tenant)
Vá em Firestore -> Rules e use algo como:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isOwner(uid) { return request.auth != null && request.auth.uid == uid; }

    match /tenants/{tenantId} {
      allow read, write: if isOwner(tenantId);
      match /{collection=**}/{docId} {
        allow read, write: if isOwner(tenantId);
      }
    }
  }
}
```

## 💳 Assinaturas (Stripe ou Mercado Pago)
- Recomendo criar uma **Cloud Function** com Webhook do Stripe/Mercado Pago.
- Ao confirmar o pagamento, atualize `tenants/{uid}.plan = "premium"` e `planExpiresAt`.
- No front, bloqueie funcionalidades premium quando `plan !== "premium"`.

## 📱 PWA e Apps Nativos
- PWA já incluso (`manifest.json` e `sw.js`). Hospede no Firebase Hosting ou Vercel.
- Para Android/iOS:
  - Use **CapacitorJS** para empacotar este PWA.
  - `npm i @capacitor/core @capacitor/cli`
  - `npx cap init barbermanager com.suaempresa.barbermanager`
  - `npx cap add android`
  - `npx cap add ios`
  - `npm run build && npx cap copy`
  - Abrir `android/` no Android Studio e `ios/` no Xcode para gerar APK/IPA.

## 📦 Estrutura
- `src/ui/*` telas e CRUDs simples com Firestore.
- `src/firebase.js` inicialização do Firebase.
- `public/manifest.json` e `public/sw.js` para PWA.

## ✅ Próximos passos sugeridos
- Notificações push com FCM (mensageria já importada).
- Link público de agendamentos para clientes (coleção de slots/horários).
- Integração de WhatsApp para lembretes de agendamento.
- Dashboard com gráficos (ex: Chart.js) e filtros por período.

**Importante:** Substitua os ícones de `/public/icons` por PNGs reais 192x192 e 512x512.
