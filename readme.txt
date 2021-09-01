El objetivo de esta plataforma es que sea utilizada como herramienta para trading semi automatizado, 
con alertas en el host de SMTP de elastic email y encryptado por SMTPJS, se harán alertas dadas ciertas
condiciones de mercado. La idea es poder utilizar la plataforma como ayuda para el arbitraje de tasas 
que existe en el mercado de futuros vs spot en Binance, usando sus WebSockets como fuente de información.

NO habrán órdenes que se puedan emitir con esta plataforma, ni contener claves para la API's de una cuenta en 
Binance, ya que los WebSockets de Binance son streams públicos. 
