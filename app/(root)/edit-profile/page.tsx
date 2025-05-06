"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { User, Globe, Camera, Save, X, MapPin, GraduationCap, Instagram, Twitter, Linkedin, Github } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem,SelectTrigger, SelectValue} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { UserType } from "@/types/UserTypes";
import { genderOptions, countryOptions, departmentOptions, stateOptions} from "@/lib/options";

const currentYear = new Date().getFullYear();
const graduationYears = Array.from(
  { length: 2035 - currentYear + 1 },
  (_, i) => currentYear + i
);

export default function EditProfile() {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [skillInput, setSkillInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/fetchUser");
        setUser({
          ...res.data.user,
          address: res.data.user.address || {},
          socialMedia: res.data.user.socialMedia || {},
        });
        calculateProfileProgress(res.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const calculateProfileProgress = (userData: UserType) => {
    const fields = [
      "name",
      "email",
      "username",
      "phoneNumber",
      "dateOfBirth",
      "gender",
      "collegeName",
      "department",
      "graduationYear",
      "bio",
    ];
    const filledFields = fields.filter(
      (field) =>
        userData[field as keyof UserType] !== undefined &&
        userData[field as keyof UserType] !== null &&
        userData[field as keyof UserType] !== ""
    ).length;

    const addressFields = userData.address
      ? Object.values(userData.address).filter(Boolean).length
      : 0;
    const socialMediaFields = userData.socialMedia
      ? Object.values(userData.socialMedia).filter(Boolean).length
      : 0;
    const skillFields = userData.skills?.length || 0;

    const totalPossible = fields.length + 5 + 5 + 3;
    const completeness = Math.min(
      100,
      Math.round(
        ((filledFields + addressFields + socialMediaFields + skillFields) /
          totalPossible) *
          100
      )
    );
    setProgress(completeness);
  };

  const handleChange = (name: string, value: string | number) => {
    setUser((prev) => {
      if (!prev) return prev;
      if (name.includes(".")) {
        const [parent, child] = name.split(".");
        return {
          ...prev,
          [parent]: {
            ...((prev[parent as keyof UserType] as object) || {}),
            [child]: value,
          },
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
    if (user) {
      calculateProfileProgress({ ...user, [name]: value });
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await axios.post("/api/uploadAvatar", formData);
      setUser((prev) =>
        prev
          ? {
              ...prev,
              avatar: res.data.avatar,
            }
          : prev
      );
    } catch (err) {
      console.error("Avatar upload failed:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const addSkill = () => {
    if (!skillInput.trim() || user?.skills?.includes(skillInput)) return;
    setUser((prev) =>
      prev
        ? {
            ...prev,
            skills: [...(prev.skills || []), skillInput.trim()],
          }
        : prev
    );
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setUser((prev) =>
      prev
        ? {
            ...prev,
            skills: prev.skills?.filter((s) => s !== skill) || [],
          }
        : prev
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      await axios.post("/api/fetchUser", user);
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <p className="text-gray-600 text-lg font-medium">
          Unable to load user data try refreshing the page.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 font-sans">
      <div className="mx-auto mt-20 max-w-7xl bg-white rounded-3xl shadow-xl overflow-hidden animate-fade-in-up">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/4 p-6 sm:p-8 bg-gray-50 border-r border-gray-200">
            <div className="flex flex-col items-center">
              <div className="relative group">
                <Avatar className="h-36 w-36 border-4 border-gradient-to-r from-indigo-300 to-purple-300 shadow-md">
                  {user.avatar ? (
                    <AvatarImage src={user.avatar} alt={user.name} />
                  ) : (
                    <AvatarFallback className="bg-blue-500 text-white text-4xl">
                      {user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md border border-gray-300 hover:bg-blue-50 hover:scale-105 transition-all"
                >
                  <Camera className="h-5 w-5 text-blue-600" />
                </button>
              </div>

              <h3 className="mt-4 text-2xl font-bold text-gray-900">
                {user.name}
              </h3>
              <p className="text-sm text-gray-500">
                @{user.username || "username"}
              </p>

              <div className="w-full mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Profile Completion
                  </span>
                  <span className="text-sm font-semibold text-blue-600">
                    {progress}%
                  </span>
                </div>
                <Progress
                  value={progress}
                  className="h-2 bg-gray-200 [&>div]:bg-blue-600"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                  <User className="h-6 w-6 text-blue-600" /> Personal
                  Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={user.name || ""}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      className="mt-1 bg-white border-gray-300 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-400 rounded-lg transition-all"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="username"
                      className="text-gray-700 font-medium"
                    >
                      Username
                    </Label>
                    <Input
                      id="username"
                      value={user.username || ""}
                      onChange={(e) => handleChange("username", e.target.value)}
                      placeholder="Enter your username"
                      className="mt-1 bg-white border-gray-300 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-400 rounded-lg transition-all"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="email"
                      className="text-gray-700 font-medium"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      value={user.email || ""}
                      disabled
                      className="mt-1 bg-gray-100 border-gray-300 text-gray-500 rounded-lg"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="phoneNumber"
                      className="text-gray-700 font-medium"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="phoneNumber"
                      value={user.phoneNumber || ""}
                      onChange={(e) =>
                        handleChange("phoneNumber", e.target.value)
                      }
                      placeholder="Enter your phone number"
                      className="mt-1 bg-white border-gray-300 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-400 rounded-lg transition-all"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="dateOfBirth"
                      className="text-gray-700 font-medium"
                    >
                      Date of Birth
                    </Label>
                    <Input
                      type="date"
                      id="dateOfBirth"
                      value={user.dateOfBirth || ""}
                      onChange={(e) =>
                        handleChange("dateOfBirth", e.target.value)
                      }
                      className="mt-1 bg-white border-gray-300 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-400 rounded-lg transition-all"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="gender"
                      className="text-gray-700 font-medium"
                    >
                      Gender
                    </Label>
                    <Select
                      value={user.gender || ""}
                      onValueChange={(value) => handleChange("gender", value)}
                    >
                      <SelectTrigger className="mt-1 bg-white border-gray-300 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-400 rounded-lg">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-300 rounded-lg shadow-md">
                        {genderOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-blue-600" /> Education
                  Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <Label
                      htmlFor="collegeName"
                      className="text-gray-700 font-medium"
                    >
                      College Name
                    </Label>
                    <Input
                      id="collegeName"
                      value={user.collegeName || ""}
                      onChange={(e) =>
                        handleChange("collegeName", e.target.value)
                      }
                      placeholder="Enter your college name"
                      className="mt-1 bg-white border-gray-300 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-400 rounded-lg transition-all"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="department"
                      className="text-gray-700 font-medium"
                    >
                      Department
                    </Label>
                    <Select
                      value={user.department || ""}
                      onValueChange={(value) =>
                        handleChange("department", value)
                      }
                    >
                      <SelectTrigger className="mt-1 bg-white border-gray-300 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-400 rounded-lg">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-300 rounded-lg shadow-md">
                        {departmentOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label
                      htmlFor="graduationYear"
                      className="text-gray-700 font-medium"
                    >
                      Graduation Year
                    </Label>
                    <Select
                      value={user.graduationYear?.toString() || ""}
                      onValueChange={(value) =>
                        handleChange("graduationYear", parseInt(value))
                      }
                    >
                      <SelectTrigger className="mt-1 bg-white border-gray-300 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-400 rounded-lg">
                        <SelectValue placeholder="Select graduation year" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-300 rounded-lg shadow-md">
                        {graduationYears.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-blue-600" /> Address
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <Input
                    value={user.address?.street || ""}
                    onChange={(e) =>
                      handleChange("address.street", e.target.value)
                    }
                    placeholder="Street"
                    className="bg-white border-gray-300 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-400 rounded-lg transition-all"
                  />
                  <Input
                    value={user.address?.city || ""}
                    onChange={(e) =>
                      handleChange("address.city", e.target.value)
                    }
                    placeholder="City"
                    className="bg-white border-gray-300 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-400 rounded-lg transition-all"
                  />
                  <Select
                    value={user.address?.state || ""}
                    onValueChange={(value) =>
                      handleChange("address.state", value)
                    }
                  >
                    <SelectTrigger className="bg-white border-gray-300 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-400 rounded-lg">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-300 rounded-lg shadow-md max-h-60 overflow-y-auto">
                      {stateOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={user.address?.country || ""}
                    onValueChange={(value) =>
                      handleChange("address.country", value)
                    }
                  >
                    <SelectTrigger className="bg-white border-gray-300 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-400 rounded-lg">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-300 rounded-lg shadow-md">
                      {countryOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    value={user.address?.postalCode || ""}
                    onChange={(e) =>
                      handleChange("address.postalCode", e.target.value)
                    }
                    placeholder="Postal Code"
                    className="bg-white border-gray-300 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-400 rounded-lg transition-all"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <Label htmlFor="bio" className="text-gray-700 font-medium">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  value={user.bio || ""}
                  onChange={(e) => handleChange("bio", e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows={5}
                  className="bg-white border-gray-300 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-400 rounded-lg transition-all"
                />
              </div>

              <div className="space-y-6">
                <Label className="text-gray-700 font-medium">Skills</Label>
                <div className="flex flex-wrap gap-2">
                  {user.skills?.map((skill) => (
                    <Badge
                      key={skill}
                      className="bg-blue-100 text-blue-800 hover:bg-blue-200 rounded-full px-3 py-1 transition-all"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-blue-600 hover:text-red-600 hover:scale-110 transition-all"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="Add new skill"
                    className="bg-white border-gray-300 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-400 rounded-lg transition-all"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:scale-105 transition-all"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                  <Globe className="h-6 w-6 text-blue-600" /> Social Media
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="relative">
                    <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                    <Input
                      value={user.socialMedia?.instagram || ""}
                      onChange={(e) =>
                        handleChange("socialMedia.instagram", e.target.value)
                      }
                      placeholder="Instagram"
                      className="pl-10 bg-white border-gray-300 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-400 rounded-lg transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                    <Input
                      value={user.socialMedia?.twitter || ""}
                      onChange={(e) =>
                        handleChange("socialMedia.twitter", e.target.value)
                      }
                      placeholder="Twitter"
                      className="pl-10 bg-white border-gray-300 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-400 rounded-lg transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                    <Input
                      value={user.socialMedia?.linkedin || ""}
                      onChange={(e) =>
                        handleChange("socialMedia.linkedin", e.target.value)
                      }
                      placeholder="LinkedIn"
                      className="pl-10 bg-white border-gray-300 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-400 rounded-lg transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                    <Input
                      value={user.socialMedia?.github || ""}
                      onChange={(e) =>
                        handleChange("socialMedia.github", e.target.value)
                      }
                      placeholder="GitHub"
                      className="pl-10 bg-white border-gray-300 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-400 rounded-lg transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                    <Input
                      value={user.socialMedia?.website || ""}
                      onChange={(e) =>
                        handleChange("socialMedia.website", e.target.value)
                      }
                      placeholder="Website"
                      className="pl-10 bg-white border-gray-300 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-400 rounded-lg transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 hover:scale-105 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:scale-105 transition-all disabled:opacity-50"
                >
                  {saving ? (
                    "Saving..."
                  ) : (
                    <div className="flex items-center gap-2">
                      <Save className="h-4 w-4" /> Save Changes
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
