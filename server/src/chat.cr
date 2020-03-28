require "shivneri"
require "./routes"
# require "./guards/all"
# require "./services/all"
# require "./models/all"
require "./walls/cors_wall"

include Chat
include Shivneri

# TODO: Write documentation for `Chat`
module Chat
  VERSION = "0.1.0"

  Shivneri.routes = routes
  path_of_static_folder = File.join(Dir.current, "static")
  puts "static folder path #{path_of_static_folder}"
  app_option = AppOption.new
  app_option.folders = [{
    path_alias: "build",
    path:       File.join(Dir.current, "../build"),
  }, {
    path_alias: "/",
    path:       path_of_static_folder,
  }]
  Shivneri.port = 5000
  Shivneri.open app_option do
    puts "app is started"
  end
  Shivneri.walls = [Wall::CorsWall]
end
