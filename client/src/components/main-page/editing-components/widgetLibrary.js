import { WidgetLibraryBar, WidgetIcon, SaveButton } from "./widgetLibraryStyles";

export default function WidgetLibrary() {
  const widgetTypes = ['history', 'messenger', 'notes', 'snapshots'];

  const renderWidgetIcons = () => {
    return widgetTypes.map((type) => 
      <WidgetIcon>
        <p>{type}</p>
      </WidgetIcon>
    )
  }

  return (
    <WidgetLibraryBar>
      {renderWidgetIcons()}
      <SaveButton>Save</SaveButton>
    </WidgetLibraryBar>
  )
}