using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using YUNI.Models;

namespace SignalRTest.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
