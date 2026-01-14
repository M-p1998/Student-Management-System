using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace student.api.Model;

[Table("studentMaster")]
public class Student
{
    public int studentId {get; set;}
    [Required]
    public string studName { get; set; } = string.Empty;
    [Required,MaxLength(10)]
    public string mobileNumber {get; set;} = string.Empty;
    public string state {get; set;} = string.Empty;
    public string city {get; set;} = string.Empty;
    [Required]
    public string email {get; set;} = string.Empty;
    public string zipcode {get; set;} = string.Empty;
    public string addressLine1 {get; set;} = string.Empty;
    public string addressLine2 {get; set;} = string.Empty;
}