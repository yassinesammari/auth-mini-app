namespace auth_app.Api.Model
{
    public class RegistrationInputDto
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
    }
}
