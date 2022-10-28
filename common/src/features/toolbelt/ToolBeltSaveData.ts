import {SaveData} from "common/tools/saving/SaveData";
import {ItemSaveData} from "common/features/items/ItemSaveData";
import {ToolType} from "common/features/toolbelt/ToolType";

export interface ToolBeltSaveData extends SaveData {
    tools: Record<ToolType, ItemSaveData | null>
}
