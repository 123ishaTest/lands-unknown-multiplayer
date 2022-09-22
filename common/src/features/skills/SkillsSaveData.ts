import {SaveData} from "common/tools/saving/SaveData";
import {SkillId} from "common/features/skills/SkillId";

export interface SkillsSaveData extends SaveData {
    skills: {
        id: SkillId;
        exp: number;
    }[];
}
