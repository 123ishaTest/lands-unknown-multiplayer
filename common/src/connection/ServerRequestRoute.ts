export enum ServerRequestRoute {
    Travel = "/worldmap/travel",
    FacilityAction = "/worldmap/facility",
    GeneratorAction = "/worldmap/generator",
    DepositItemsById = "/bank/deposit/id",
    WithdrawItemsById = "/bank/withdraw/id",
    DropInventorySlot = "/inventory/drop",
    EquipItemRequest = "/inventory/equip/index",
    UnEquipItemRequest = "/inventory/unequip/type",

    EquipToolRequest = "/toolbelt/equip/index",
    UnEquipToolRequest = "/toolbelt/unequip/type",

    TalkToNpcRequest = "/dialog/start",
    DialogNextRequest = "/dialog/next",
    DialogChoiceRequest = "/dialog/choice",
}
