### Get stats
`GET /stats`

+ Response
```
[
  {
    protocol: 'tcp' | 'udp' | 'http',
    host: string,
    port: number,
    address?: string,
    connections: number,
  }
]
```

### Add task
`POST /tasks`

+ Request
```typescript
{
  protocol: 'tpc' | 'udp' | 'http';
  host: string;
  port: number;
  address: string;
}
```
