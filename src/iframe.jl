export iframe

mutable struct IFrame
    innerHTML::AbstractString
end

function iframe(content)
    return node(IFrame(stringmime("text/html", content)))
end
