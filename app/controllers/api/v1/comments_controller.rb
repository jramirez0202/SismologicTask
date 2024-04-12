class Api::V1::CommentsController < ApplicationController
  def create
    @feature = Feature.find_by(id: comment_params[:feature_id])
    
    if @feature
      @comment = @feature.comments.build(comment_params.except(:feature_id))
      if @comment.save
        render json: @comment, status: :created
      else
        render json: @comment.errors, status: :unprocessable_entity
      end
    else
      render json: { error: "Feature not found" }, status: :not_found
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :feature_id)
  end
end
