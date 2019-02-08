mutable struct TestConn <: AbstractConnection
    channel::Channel
end

function Sockets.send(c::TestConn, msg)
    put!(c.channel, msg)
end

Base.isopen(c::TestConn) = true

import WebIO: dispatch

# @testset "communication" begin
#
#     w = Scope("testctx1")
#
#    #@test isa(instanceof(w), Scope)
#    #@test instanceof(w).id == "testctx1"
#
#     send(w, :msg_to_js, "hello js") # Queue a message to the JS side.
#     @test take!(w.pool.outbox) == Dict("type"=>"command",
#                                   "scope"=>"testctx1",
#                                   "command"=>:msg_to_js,
#                                   "data"=>"hello js")
#
#     send(w, :msg_to_js, "hello js again") # Queue it again
#
#     conn = TestConn(Channel{Any}(32)) # create a test connection
#
#     # mimic front-end sending a _setup_scope special message
#     # this message denotes that `conn` will be handling messages
#     # to and from the scope with the given id
#     dispatch(conn, Dict("command" => "_setup_scope",
#                         "scope" => "testctx1"))
#
#     msg = take!(conn.channel)
#
#     # now ctx should have passed on its queued message to connection
#     # in TestConn the message is simply stored in its msg ref field
#     @test msg == Dict("type"=>"command",
#                       "command"=>:msg_to_js,
#                       "scope"=>"testctx1",
#                       "data"=>"hello js again")
#
#     # further messages are sent freely
#     send(w, :msg_to_js, "hello js a third time")
#     wait(conn.channel)
#     msg = take!(conn.channel)
#     @test msg == Dict("type"=>"command",
#                       "command"=>:msg_to_js,
#                       "scope"=>"testctx1",
#                       "data"=>"hello js a third time")
#
#     # mimic messages coming in from JS side
#
#     # no scope named xx
#     @test_logs((:warn, r".*unknown scope xx.*"),
#         dispatch(conn, Dict("command" => "incoming",
#                             "data"=>"hi Julia", "scope"=>"xx")))
#     msg = take!(conn.channel)
#     # a warning was raised on receiving a message for an unknown
#     # scope xx
#     @test msg["type"] == "log"
#     @test occursin("unknown scope xx", msg["message"])
#
#     # this should give a warning
#     @test_logs((:warn, r".*incoming does not have a handler for scope id testctx1.*"),
#                dispatch(conn, Dict("command" => "incoming",
#                                    "data"=>"hi Julia", "scope"=>"testctx1")))
#
#     msg = Ref("")
#     on(x -> msg[] = x, w, "incoming") # setup the handler
#
#     # dispatch message again
#     dispatch(conn, Dict("command" => "incoming",
#                         "data"=>"hi Julia!", "scope"=>"testctx1"))
#
#     @test msg[] == "hi Julia!"
#
#     # Test connection pool's handling of multiple simultaneous connections
#     @testset "connection pool" begin
#         @testset "sending to two connections" begin
#             outbox = Channel{Any}(1)
#             pool = WebIO.ConnectionPool(outbox)
#             t1 = TestConn(Channel{Any}(1))
#             t2 = TestConn(Channel{Any}(2))
#             # Both connections are added before the message is
#             # sent, so both should receive the message.
#             addconnection!(pool, t1)
#             # Previously, it was possible for `process_messages()`
#             # to advance to waiting for a new message rather than
#             # continuing to look for new connections if the current
#             # task yielded. We do so here to make sure it's fixed.
#             yield()
#             addconnection!(pool, t2)
#             put!(outbox, "hello")
#             @test take!(t1.channel) == "hello"
#             @test take!(t2.channel) == "hello"
#         end
#
#         @testset "sending to one connection" begin
#             outbox = Channel{Any}(1)
#             pool = WebIO.ConnectionPool(outbox)
#             t1 = TestConn(Channel{Any}(1))
#             t2 = TestConn(Channel{Any}(2))
#             # Only t1 has been added, so only it should receive
#             # the message:
#             addconnection!(pool, t1)
#             put!(outbox, "hello1")
#             @test take!(t1.channel) == "hello1"
#             @test !isready(t2.channel)
#
#             # Now we add a second connection and make sure both
#             # connections get all future messages
#             addconnection!(pool, t2)
#             put!(outbox, "hello2")
#             @test take!(t1.channel) == "hello2"
#             @test take!(t2.channel) == "hello2"
#         end
#     end
#
# end
