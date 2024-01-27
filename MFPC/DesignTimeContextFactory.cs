using MFPC.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace MFPC
{
    public class DesignTimeContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        private const string LocalSql = "server=localhost;database=MFPC-local;Trusted_Connection=True;TrustServerCertificate=True;";

        private static readonly string MigrationAssemblyName = typeof(DesignTimeContextFactory).Assembly.GetName().Name;

        public AppDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<AppDbContext>()
                .UseSqlServer(args.FirstOrDefault() ?? LocalSql,
                op => op.MigrationsAssembly(MigrationAssemblyName));
            return new AppDbContext(builder.Options);
        }
    }
}
