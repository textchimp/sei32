class WorksController < ApplicationController

  def new
    @work = Work.new
  end

  def create

    # NOTE: we use .new and not .create because we might have to add
    # the cloudinary image ID before we save this new item

    w = Work.new work_params  # pass in the filtered ('strong') version of params

    if params[:file].present?
      req = Cloudinary::Uploader.upload( params[:file] )
      w.image = req["public_id"]
    end

    # now that we have (maybe) added the image ID,
    # we can save the new item to the database
    w.save


    # ^ We can see if there was an error when creating this record by looking at 'w.errors' and 'w.errors.messages'

    redirect_to work_path(w.id)  # back to the index page
  end

  def index
    @works = Work.all
  end

  def show
    @work = Work.find params[:id]
  end

  def edit
    @work = Work.find params[:id]
  end

  def update
    work = Work.find params[:id]

    # Just for Cloudinary demo week 6
    # (note you should remove ':image' from the strong params permit() list)
    if params[:file].present?
      req = Cloudinary::Uploader.upload(params[:file])
      work.image = req["public_id"]
    end


    work.update work_params

    redirect_to work_path(work.id)
  end

  def destroy
    Work.destroy params[:id]
    redirect_to works_path
  end

  private

  def work_params
    params.require(:work).permit(:title, :year, :medium, :style, :image, :artist_id)
  end


end # class WorksController
