module Api
  class RecordsController < ApplicationController
    def index
      render json: Record.all
    end

    def search
	  query = params[:query]
	  records = Record.where('title LIKE ? OR date LIKE ? OR amount LIKE ?',
	                       "%#{query}%", "%#{query}%", "%#{query}%")
	  render json: records
	end

	def create
	  record = Record.new(record_params)
	  if record.save
	    render json: record
	  else
	    render nothing: true, status: :bad_request
	  end
	end

	private

	def record_params
	  params.require(:record).permit(:title, :date, :amount)
	end
  end
end