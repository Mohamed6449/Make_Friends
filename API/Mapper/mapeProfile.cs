using System.Security.Cryptography;
using System.Text;
using API.DTO;
using API.models;
using AutoMapper;

namespace API.Mapper;

public class mapeProfile:Profile
{
    public mapeProfile()
    {
        CreateMap<SeedDto,AppUser>().ForMember(f=>f.UserName,o=>o.MapFrom(m=>m.DisplayName)).
        ForMember(m=>m.member,o=>o.MapFrom(src=>src));
        CreateMap<SeedDto, Member>()
    .ForMember(dest => dest.photos, opt => opt.MapFrom(src =>
        new List<Photo>
        {
            new Photo { Url = src.ImageUrl ?? "" }
        }
    ));

        CreateMap<SeedDto,Photo>().ForMember(f=>f.Url,o=>o.MapFrom(m=>m.ImageUrl));
        CreateMap<UpdateMemberDto,AppUser>().ForMember(f=>f.UserName,src=>src.MapFrom(m=>m.DisplayName))    .ForAllMembers(opt => opt.Condition(
        (src, dest, srcValue) => srcValue != null));
;

        CreateMap<UpdateMemberDto, Member>().ForMember(f=>f.appUser,src=>src.MapFrom(m=>m))
    .ForAllMembers(opt => opt.Condition(
        (src, dest, srcValue) => srcValue != null));

    }
    

}
