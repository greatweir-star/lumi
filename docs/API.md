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

## Skills

```http
GET /skills
GET /skills/:id
```

## Skills Lab

```http
GET /skills-lab/packages
GET /skills-lab/packages/:id
GET /skills-lab/stats
GET /skills-lab/categories
GET /skills-lab/share-template
POST /skills-lab/packages
POST /skills-lab/packages/:id/install-plan
```

Skills Lab 是社区 Skill / Lua 市场。第三方包默认需要经过来源、许可证、权限、风险和兼容性检查后才能安装。

## Claw Dataset

```http
GET /datasets/claws
GET /datasets/claws/:id
GET /datasets/skill-tests
GET /datasets/skill-tests/results
GET /datasets/compatibility
GET /datasets/stats
```

## Runtime

```http
GET /runtime/blueprints
GET /runtime/blueprint
GET /runtime/blueprint/:id
GET /runtime/capability-catalog
GET /runtime/capabilities
GET /runtime/filesystem
GET /runtime/web-console-modules
GET /runtime/state
GET /runtime/deployment-unit
```

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

## Deployments

```http
POST /deployments
```

真实部署单元后续必须包含 firmware manifest、runtime profile、runtime fs seed、agent config、skills、skills lab packages、router rules、memory seed 和 device identity。
