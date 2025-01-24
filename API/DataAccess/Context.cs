using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataAccess
{
    public class Context : DbContext
    {
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Registration> Registrations { get; set; }


        // Constructor that accepts DbContextOptions<Context>
        public Context(DbContextOptions<Context> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // Specify the migrations assembly explicitly
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(
                    "YourConnectionStringHere",
                    options => options.MigrationsAssembly("API") // Specify your target project here
                );
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Registration>().ToTable("Registrations");
        }

    }
}
