# Node-Express-Prisma server project template

## Prisma Settings and Props

### Install prisma

```
npm install --save-dev prisma
```

### Init prisma with database

```
npx prisma init --datasource-provider postgresql

(could be NoSQL database as well)*
```

### Migrate changes with Prisma

```
npx prisma migrate --name 'some name'
```

### Install Prisma client

```
npm install @prisma/client
```

### Generate client

```
npx prisma generate
```

### Prisma attributes

```
@id        --> assign field as id
@relation  --> assign a relation between models (tables)
@default   --> assing a default value
@unique    --> set field value as unique
@
```
