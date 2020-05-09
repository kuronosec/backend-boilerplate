module.exports = {
  port: parseInt(process.env.HAPI_PORT || 9090),
  host: process.env.HAPI_HOST || '0.0.0.0'
}
