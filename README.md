# ts-express-app-template

### About
A basic expressJS application template that includes Typescript, ESLint, Prettier, Husky, and Jest.

Dependencies:
- express
- zod
- cors
- helmet
- morgan
- winston
- dotenv-safe

Dev Depenndencies:
- typescript
- eslint
- typescript-eslint
- prettier
- husky
- jest
- ts-jest
- supertest
- nodemon
- ts-node

### Installation
1. Clone this repository
```bash
git clone git@github.com:JakeBisson8/ts-express-app-template.git
```
2. Update remote to point to your own repository
```bash
git remote remove origin
git remote add origin <your github repo link>.git
git push
```
3. Install project dependencies
```bash
npm install
```
4. make a copy of `.env.example` and update values
5. Start the development server
```bash
npm run dev
```

### Lint
Check for linter errors:
```bash
npm run lint
```

Check for linter errors and address fixable errors:
```bash
npm run lint:fix
```

### Format
Check for formatting errors:
```bash
npm run prettier:check
```
Format files:
```bash
npm run prettier:write
```

### Test
```bash
npm run test
```

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm run start
```

### License
[MIT](https://choosealicense.com/licenses/mit/)
