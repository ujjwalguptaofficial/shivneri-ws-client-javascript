module Chat
  module Wall
    class CorsWall < Shivneri::Wall
      def incoming
        response.headers["Access-Control-Allow-Origin"] = "*"
        nil;
      end
    end
  end
end
