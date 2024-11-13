AUTH - POST /signup - POST /login - POST /logout
Profile - GET /profile/view - PATCH /profile/edit - PATCH /profile/password

ConnectionRequestRouter: - POST -/request/send/ignored/:userId - POST -/request/send/intrested/:userId - POST -/request/review/accepted/:requestId - POST -/request/review/rejected/:requestId

User:
-GET -/user/connections
-GET -/user/requests
-GET -/user/feed
