class DashboardController < ApplicationController
  def app
  end

  def uptime
    @up = `uptime`

    response = { command: 'uptime', data: @up }
    puts response

    respond_to do |format|
      format.html  # do nothing, i.e. render the default template uptime.html.erb
      format.json { render json: response }  # render a Ruby variable as a JSON string
    end


  end  # uptime


  def cpu_hog

    # Run an command to see all processes on the system, ordered by highest CPU use to lowest,
    # split the output on the newline character to give us an array of lines, and then take only
    # the second line (the highest CPU process; the first line is the column headings line)
    hog = `ps xr`.split("\n").second  # [1]
    date = `date`

    response = {
      cpuHog: hog,
      currentDate: date,
      pointlessArray: ['one', 'two', 'three', 'four']
    }

    render json: response

  end  # cpu_hog



  def dogs_index
    @dogs = Dog.all

    respond_to do |format|
      format.html
      format.json { render json: @dogs  }
    end

  end  # dogs_index

end
