module Api
  class RecordsController < ApplicationController
    def index
      render json: Record.all
    end
  end
end