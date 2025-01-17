using System;
using Nm.Lib.Data.Abstractions;
using Nm.Lib.Data.Core;

namespace Nm.Module.Common.Infrastructure.Repositories
{
    public class CommonDbContext : DbContext
    {
        public CommonDbContext(IDbContextOptions options, IServiceProvider serviceProvider) : base(options, serviceProvider)
        {
        }
    }
}
