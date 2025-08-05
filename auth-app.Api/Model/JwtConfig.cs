﻿namespace auth_app.Api.Model
{
    public class JwtConfig
    {
        public string? Issuer { get; set; }
        public string? Audience { get; set; }
        public string? SecretKey { get; set; }
        public int ExpirationMinutes { get; set; }
    }
}
