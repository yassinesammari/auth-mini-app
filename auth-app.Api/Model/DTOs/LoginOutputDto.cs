namespace auth_app.Api.Model
{
    public class LoginOutputDto
    {
        public string Token { get; set; } = string.Empty;
        public bool Result { get; set; }
        public string Message { get; set; }
    }
}
