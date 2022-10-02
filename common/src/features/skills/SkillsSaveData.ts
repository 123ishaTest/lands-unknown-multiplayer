import type {SaveData} from "common/tools/saving/SaveData";
import type {SkillId} from "common/features/skills/SkillId";

export interface SkillsSaveData extends SaveData {
    skills: {
        id: SkillId;
        exp: number;
    }[];
}
