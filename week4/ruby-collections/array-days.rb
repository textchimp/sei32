# 1. Create an array of the days of the week
# Create a variable named days_of_the_week as an array of the following:
# Monday
# Tuesday
# Wednesday
# Thursday
# Friday
# Saturday
# Sunday

days = %w{ Monday Tuesday Wednesday Thursday Friday Saturday Sunday }

# puts days
# p days


# 2. My calendar says the first day is Sunday...
# Remove Sunday from the last postion and move it to the first position. Use array methods.

moved_day = days.pop
days.unshift moved_day

p days

# One-liner of the above, shorter but less readable:
days = %w{ Monday Tuesday Wednesday Thursday Friday Saturday Sunday }
days.unshift( days.pop )
p days

# RTFM
days = %w{ Monday Tuesday Wednesday Thursday Friday Saturday Sunday }
days.rotate! -1
p days

# 3. Create a new array of the days of the week:
# The first inner array should be the weekdays
# The second inner array should be the weekend days
days = %w{ Monday Tuesday Wednesday Thursday Friday Saturday Sunday }
week_days = days[0..4]
weekend_days = days[5..6]

week_parts = [ week_days, weekend_days ]
# week_parts = [ days[0..4], days[5..6] ]    # one-liner
p week_parts

# 4. Remove either the weekdays or the weekends
# Your choice...

# week_parts.shift
week_parts.pop
p week_parts

# 5. Sort the remaining days alphabetically

sorted_days = week_parts.first.sort
p sorted_days
