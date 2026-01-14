using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using student.api.Model;

namespace student.api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StudentMasterController : ControllerBase
{
    private readonly StudentDbContext _context;

    public StudentMasterController(StudentDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
    {
        var students = await _context.Students.ToListAsync();
        return Ok(students);
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<Student>> GetStudentsById(int id)
    {
        var student = await _context.Students.FindAsync(id);
        if (student == null)
        {
            return NotFound(new
            {
                Status = "Error",
                Message = "Student not found"
            });
        }
        return Ok(student);
    }

    [HttpPost]
    public async Task<ActionResult<Student>> SaveStudent(Student student)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await _context.Students.AddAsync(student);
        await _context.SaveChangesAsync();
        
        return Ok(student);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateStudent(int id, [FromBody] Student student)
    {
        var record = await _context.Students.FindAsync(student.studentId);
        if (record == null)
        {
            var notFoundResponse = new
            {
                Status = "Error",
                Message = "Student record not found."
            };
            return NotFound(notFoundResponse);
        }

        record.studName = student.studName;
        record.email = student.email;
        record.city = student.city;
        record.state = student.state;
        record.mobileNumber = student.mobileNumber;
        record.addressLine1 = student.addressLine1;
        record.addressLine2 = student.addressLine2;
        record.zipcode = student.zipcode;
        
        await _context.SaveChangesAsync();
        return Ok(record);

    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteStudentById(int id)
    {
        var record =await _context.Students.FindAsync(id);
        if (record == null)
        {
            return NotFound(new
                {
                    Status = "Error",
                    Message = "Student not found"
                }    
            );
        }

        _context.Students.Remove(record);
        await _context.SaveChangesAsync();
        return Ok(record);
    }
}