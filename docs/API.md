# LumiForge API v0.2

## Health

```http
GET /health
```

## Devices

```http
GET /devices
GET /devices/:id
```

## Agent Templates

```http
GET /templates
GET /templates/:id
```

## Runtime Blueprint

```http
GET /runtime/blueprints
GET /runtime/blueprint
GET /runtime/blueprint/:id
GET /runtime/capabilities
GET /runtime/filesystem
GET /runtime/web-console-modules
```

默认 Runtime Profile 为 `esp-claw-compatible`，用于对齐 ESP-Claw 的 AI Native 能力面。

## Recommendations

```http
GET /recommendations/:templateId
```

## Projects

```http
POST /projects
GET /projects
GET /projects/:id/agent-config
```

`GET /projects/:id/agent-config` 返回：

```json
{
  "agent": {},
  "runtime": {}
}
```

也就是项目级 Agent Config + 当前 Runtime Blueprint。

## Deployments

```http
POST /deployments
```

部署返回：

```json
{
  "deployment": {},
  "runtime": {},
  "progress": []
}
```

后续真实部署单元必须包含：

- firmware manifest
- runtime profile
- runtime fs seed
- agent config
- skills
- router rules
- memory seed
- device identity
