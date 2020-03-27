require "shivneri"
require "./routes"
# require "./guards/all"
# require "./services/all"
# require "./models/all"
require "./walls/cors_wall"
include Chat

# TODO: Write documentation for `Chat`
module Chat
  VERSION = "0.1.0"

  Shivneri.routes = routes
  Shivneri.open do
    puts "app is started"
  end
  Shivneri.walls = [Wall::CorsWall]
end
