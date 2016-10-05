module Api
  class RecordsController < ApplicationController
  	before_action :set_record, only: [:update, :destroy]

    def index
      render json: Record.order(sort_by + ' ' + order)
    end

    def search
	  query = params[:query]
	  records = Record.where('title LIKE ? OR date LIKE ? OR amount LIKE ?',
	                       "%#{query}%", "%#{query}%", "%#{query}%")
	  render json: records
	end

	def create
	  @record = Record.new(record_params)
	  if @record.save
	    render json: @record
	  else
	    render nothing: true, status: :bad_request
	  end
	end

	def update
      if @record.update(record_params)
        render json: @record
      else
        render nothing: true, status: :unprocessable_entity
      end
	end

	def destroy
      @record.destroy
      head :no_content
	end

	private

	def record_params
	  params.require(:record).permit(:title, :date, :amount)
	end

	def set_record
      @record = Record.find(params[:id])
	end

	def sort_by
      %w(title
         date
         amount).include?(params[:sort_by]) ? params[:sort_by] : 'title'
    end

    def order
      %w(asc desc).include?(params[:order]) ? params[:order] : 'asc'
	end
  end
end