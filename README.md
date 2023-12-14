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
- cross-env
- lint-staged
- rimraf

### Installation
1. Select to use the template in GitHub and create a new repository
2. Clone your new repository
```bash
git clone <repository_link>.git
```
3. Udpate `package.json` to change the `name`, `description`, `version`, `keywords` etc. to match your project.
4. Install project dependencies using your package manager of choice
```bash
npm install
```
5. Install recommended vscode extensions
    1. ESLint
    2. Prettier - Code Formatter
6. Set prettier as default formatter and format on save
```json
{
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```
7. make a copy of `.env.example` and update values
8. Start the development server
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
[MIT](https://github.com/JakeBisson8/angular-17-app-template/blob/main/LICENSE)  
[https://choosealicense.com/licenses/mit/](https://choosealicense.com/licenses/mit/)
